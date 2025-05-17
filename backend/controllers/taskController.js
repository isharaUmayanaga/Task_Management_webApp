
const Task = require('../models/Task');
const { validationResult } = require('express-validator');
const PDFDocument = require('pdfkit');

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ 
      _id: req.params.id,
      createdBy: req.user._id
    });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create task
exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, deadline, assignedTo, status } = req.body;
    
    const task = await Task.create({
      title,
      description,
      deadline,
      assignedTo,
      status,
      createdBy: req.user._id
    });
    
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, deadline, assignedTo, status } = req.body;
    
    let task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, deadline, assignedTo, status },
      { new: true }
    );
    
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    await Task.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Task removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Generate PDF report
exports.generatePDF = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id }).sort({ deadline: 1 });
    
    // Create a new PDF document
    const doc = new PDFDocument();
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=tasks-report.pdf');
    
    // Pipe the PDF to the response
    doc.pipe(res);
    
    // Add content to the PDF
    doc.fontSize(20).text('Task Management Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });
    doc.moveDown();
    
    // Add table headers
    const tableTop = 150;
    const textOptions = { width: 412, align: 'left' };
    
    doc.fontSize(10).text('Title', 50, tableTop, textOptions);
    doc.text('Assigned To', 150, tableTop, textOptions);
    doc.text('Status', 250, tableTop, textOptions);
    doc.text('Deadline', 320, tableTop, textOptions);
    
    // Add a line
    doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();
    
    // Add table rows
    let rowTop = tableTop + 25;
    
    tasks.forEach((task) => {
      doc.fontSize(9).text(task.title, 50, rowTop, textOptions);
      doc.text(task.assignedTo, 150, rowTop, textOptions);
      doc.text(task.status, 250, rowTop, textOptions);
      doc.text(new Date(task.deadline).toLocaleDateString(), 320, rowTop, textOptions);
      
      rowTop += 20;
      
      // Add a new page if we're at the bottom
      if (rowTop > 700) {
        doc.addPage();
        rowTop = 50;
      }
    });
    
    // Finalize the PDF
    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
