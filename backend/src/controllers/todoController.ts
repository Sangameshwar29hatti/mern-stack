import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Todo from '../models/Todo';

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  const { text } = req.body;
  try {
    const newTodo = new Todo({
      text,
      completed: false
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }
  const { completed } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { completed }, { new: true });
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(updatedTodo);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
