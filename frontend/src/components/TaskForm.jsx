import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

const TaskForm = ({ isOpen, onClose, onAddTask, users, editingTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState(null);
    const [status, setStatus] = useState('To Do');
    const [dueDate, setDueDate] = useState(undefined);
    const [priority, setPriority] = useState(undefined);

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setAssignedTo(editingTask.assignedTo);
            setStatus(editingTask.status);
            setDueDate(editingTask.dueDate);
            setPriority(editingTask.priority);
        } else {
            // Reset form when adding a new task
            setTitle('');
            setDescription('');
            setAssignedTo(null);
            setStatus('To Do');
            setDueDate(undefined);
            setPriority(undefined);
        }
    }, [editingTask]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert('Title is required'); // Basic validation
            return;
        }

        const newTask = {
            _id: editingTask?._id || crypto.randomUUID(), // Use existing ID if editing
            title,
            description,
            assignedTo,
            status,
            dueDate,
            priority
        };
        onAddTask(newTask);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-white/5 backdrop-blur-md border border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-white">
                        {editingTask ? 'Edit Task' : 'Add New Task'}
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        {editingTask
                            ? 'Modify the task details below.'
                            : 'Enter the task details below.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Task title"
                            className="mt-1 bg-black/20 text-white border-white/10"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                            Description
                        </label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Task description"
                            className="mt-1 bg-black/20 text-white border-white/10 min-h-[100px]"
                        />
                    </div>
                    <div>
                        <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-300">
                            Assigned To
                        </label>
                        <Select
                            onValueChange={(value) => {
                                const selectedUser = users.find(user => user._id === value);
                                setAssignedTo(selectedUser || null);
                            }}
                            value={assignedTo?._id || undefined}
                        >
                            <SelectTrigger className="mt-1 w-full bg-black/20 text-white border-white/10">
                                <SelectValue placeholder="Select a user" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700">
                                {users.map((user) => (
                                    <SelectItem key={user._id} value={user._id}>
                                        {user.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-300">
                            Status
                        </label>
                        <Select onValueChange={setStatus} value={status}>
                            <SelectTrigger className="mt-1 w-full bg-black/20 text-white border-white/10">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700">
                                <SelectItem value="To Do">To Do</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Done">Done</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-300">
                            Due Date
                        </label>
                         <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal mt-1 bg-black/20 text-white border-white/10",
                                        !dueDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700" align="start">
                                 <Calendar
                                    mode="single"
                                    selected={dueDate}
                                    onSelect={setDueDate}
                                     disabled={(date) =>
                                        date < new Date()
                                    }
                                    initialFocus
                                    className="rounded-md border border-gray-700 text-white"
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-300">
                            Priority
                        </label>
                        <Select onValueChange={setPriority} value={priority}>
                            <SelectTrigger className="mt-1 w-full bg-black/20 text-white border-white/10">
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700">
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Low">Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-300"
                        >
                            {editingTask ? 'Update Task' : 'Add Task'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default TaskForm;
