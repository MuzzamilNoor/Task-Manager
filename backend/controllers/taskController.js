const Task = require('../models/Task');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
});

exports.createTask = catchAsync(async (req, res, next) => {
  const newTask = await Task.create(req.body);
  res.status(201).json(newTask);
});

exports.getTaskById = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) return next(new AppError('Task not found', 404));
  res.status(200).json(task);
});

exports.updateTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!task) return next(new AppError('Task not found', 404));
  res.status(200).json(task);
});

exports.patchTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );
  if (!task) return next(new AppError('Task not found', 404));
  res.status(200).json(task);
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return next(new AppError('Task not found', 404));
  res.status(200).json({ message: 'Task deleted' });
});