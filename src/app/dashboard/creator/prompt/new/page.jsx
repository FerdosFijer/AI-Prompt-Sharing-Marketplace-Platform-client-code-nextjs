"use client";

import React, { useState } from "react";
import {
  Form,
  TextField,
  TextArea,
  Select,
  ListBox,
  Fieldset,
  FieldError,
  Button,
  RadioGroup,
  Radio,
  Input,
  Label,
} from "@heroui/react";

export default function CreatePromptForm() {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Form state for controlled selection inputs
  const [category, setCategory] = useState("");
  const [aiTool, setAiTool] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // Append select values to data
    data.category = category;
    data.aiTool = aiTool;
    data.difficulty = difficulty;

    // Validation checks
    const newErrors = {};
    if (!data.title) newErrors.title = "Prompt title is required.";
    if (!data.description) newErrors.description = "Description is required.";
    if (!data.content) newErrors.content = "Prompt content is required.";
    if (!data.category) newErrors.category = "Please select a category.";
    if (!data.aiTool) newErrors.aiTool = "Please select an AI tool.";
    if (!data.difficulty) newErrors.difficulty = "Select a difficulty level.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    const payload = {
      ...data,
      tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
      copyCount: 0,
      status: "pending",
    };
    console.log("submitted promt payload", payload);
    

    try {
      const response = await fetch("/api/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        e.target.reset();
        setCategory("");
        setAiTool("");
        setDifficulty("");
        setPreviewImage(null);
      } else {
        const errorData = await response.json();
        setErrors({ form: errorData.message || "Failed to submit prompt." });
      }
    } catch (err) {
      setErrors({ form: "An unexpected error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: "File size exceeds 2MB limit." }));
        return;
      }
      setPreviewImage(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: null }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-[#0B0F19] text-white rounded-2xl shadow-2xl border border-gray-800">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Create New Prompt Templates
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Fill in details to submit a prompt to the community catalog
        </p>
      </header>

      <Form onSubmit={handleSubmit} className="space-y-6">
        <Fieldset className="space-y-5">
          {/* Prompt Title */}
          <TextField name="title" className="w-full">
            <Label className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1 block">
              Prompt Title *
            </Label>
            <Input
              placeholder="e.g. Optimized React Tailwind Card Builder"
              className="w-full bg-[#121827] border border-gray-800 text-white placeholder-gray-500 focus:border-purple-500 rounded-lg px-3 py-2"
            />
            {errors.title && <FieldError className="text-red-400 text-xs mt-1">{errors.title}</FieldError>}
          </TextField>

          {/* Short Description */}
          <TextField name="description" className="w-full">
            <Label className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1 block">
              Short Description *
            </Label>
            <Input
              placeholder="Explain what this prompt accomplishes in 1–2 sentences"
              className="w-full bg-[#121827] border border-gray-800 text-white placeholder-gray-500 focus:border-purple-500 rounded-lg px-3 py-2"
            />
            {errors.description && <FieldError className="text-red-400 text-xs mt-1">{errors.description}</FieldError>}
          </TextField>

          {/* Prompt Content Template */}
          <div className="w-full">
            <Label className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1 block">
              Prompt Content Template *
            </Label>
            <TextArea
              name="content"
              rows={5}
              placeholder="Write the full, detailed prompt instructions. Use brackets to indicate variables e.g., 'Act as a [role]...'"
              className="w-full bg-[#121827] border border-gray-800 text-white placeholder-gray-500 focus:border-purple-500 rounded-lg p-3"
            />
            {errors.content && <FieldError className="text-red-400 text-xs mt-1">{errors.content}</FieldError>}
          </div>

          {/* Category & AI Engine */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              className="w-full"
              placeholder="Select Category"
              selectedKey={category}
              onSelectionChange={(key) => setCategory(key)}
            >
              <Label className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1 block">
                Category *
              </Label>
              <Select.Trigger className="w-full bg-[#121827] border border-gray-800 text-white rounded-lg px-3 py-2 flex justify-between items-center">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="bg-[#121827] border border-gray-800 rounded-lg text-white p-1">
                <ListBox>
                  <ListBox.Item id="coding" textValue="Coding" className="p-2 hover:bg-gray-800 cursor-pointer rounded">
                    Coding
                  </ListBox.Item>
                  <ListBox.Item id="writing" textValue="Writing" className="p-2 hover:bg-gray-800 cursor-pointer rounded">
                    Writing
                  </ListBox.Item>
                  <ListBox.Item id="marketing" textValue="Marketing" className="p-2 hover:bg-gray-800 cursor-pointer rounded">
                    Marketing
                  </ListBox.Item>
                  <ListBox.Item id="design" textValue="Design" className="p-2 hover:bg-gray-800 cursor-pointer rounded">
                    Design
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
              {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
            </Select>

            <Select
              className="w-full"
              placeholder="Select AI Engine"
              selectedKey={aiTool}
              onSelectionChange={(key) => setAiTool(key)}
            >
              <Label className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1 block">
                AI Engine *
              </Label>
              <Select.Trigger className="w-full bg-[#121827] border border-gray-800 text-white rounded-lg px-3 py-2 flex justify-between items-center">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="bg-[#121827] border border-gray-800 rounded-lg text-white p-1">
                <ListBox>
                  <ListBox.Item id="chatgpt" textValue="ChatGPT" className="p-2 hover:bg-gray-800 cursor-pointer rounded">
                    ChatGPT
                  </ListBox.Item>
                  <ListBox.Item id="claude" textValue="Claude" className="p-2 hover:bg-gray-800 cursor-pointer rounded">
                    Claude
                  </ListBox.Item>
                  <ListBox.Item id="midjourney" textValue="Midjourney" className="p-2 hover:bg-gray-800 cursor-pointer rounded">
                    Midjourney
                  </ListBox.Item>
                  <ListBox.Item id="gemini" textValue="Gemini" className="p-2 hover:bg-gray-800 cursor-pointer rounded">
                    Gemini
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
              {errors.aiTool && <p className="text-red-400 text-xs mt-1">{errors.aiTool}</p>}
            </Select>
          </div>

          {/* Difficulty & Visibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <Select
              className="w-full"
              placeholder="Select Level"
              selectedKey={difficulty}
              onSelectionChange={(key) => setDifficulty(key)}
            >
              <Label className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1 block">
                Difficulty Level *
              </Label>
              <Select.Trigger className="w-full bg-[#121827] border border-gray-800 text-white rounded-lg px-3 py-2 flex justify-between items-center">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="bg-[#121827] border border-gray-800 rounded-lg text-white p-1">
                <ListBox>
                  <ListBox.Item id="beginner" textValue="Beginner" className="p-2 hover:bg-gray-800 cursor-pointer rounded">
                    Beginner
                  </ListBox.Item>
                  <ListBox.Item id="intermediate" textValue="Intermediate" className="p-2 hover:bg-gray-800 cursor-pointer rounded">
                    Intermediate
                  </ListBox.Item>
                  <ListBox.Item id="pro" textValue="Pro" className="p-2 hover:bg-gray-800 cursor-pointer rounded">
                    Pro
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
              {errors.difficulty && <p className="text-red-400 text-xs mt-1">{errors.difficulty}</p>}
            </Select>

            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2 block">
                Visibility Status *
              </Label>
              <RadioGroup
                defaultValue="public"
                name="visibility"
                orientation="horizontal"
                className="flex gap-4 pt-1"
              >
                <Radio value="public" className="text-sm text-gray-300">
                  Public (Free access)
                </Radio>
                <Radio value="private" className="text-sm text-gray-300">
                  Private (Premium lock)
                </Radio>
              </RadioGroup>
            </div>
          </div>

          {/* Tags */}
          <TextField name="tags" className="w-full">
            <Label className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1 block">
              Tags (Comma-Separated)
            </Label>
            <Input
              placeholder="e.g. tailwind, card, component, responsive"
              className="w-full bg-[#121827] border border-gray-800 text-white placeholder-gray-500 focus:border-purple-500 rounded-lg px-3 py-2"
            />
          </TextField>

          {/* Thumbnail Image Upload */}
          <div>
            <Label className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2 block">
              Thumbnail Image Upload
            </Label>
            <div className="relative border-2 border-dashed border-gray-800 hover:border-purple-500/50 rounded-xl p-6 text-center transition-colors bg-[#121827]/50">
              <input
                type="file"
                name="thumbnail"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {previewImage ? (
                <div className="flex flex-col items-center">
                  <img
                    src={previewImage}
                    alt="Thumbnail Preview"
                    className="h-28 w-auto object-cover rounded-lg mb-2"
                  />
                  <p className="text-xs text-purple-400">Click or drag to replace</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="mx-auto w-8 h-8 text-gray-400 flex items-center justify-center">
                    <i className="gi gi-upload text-xl" />
                  </div>
                  <p className="text-sm font-semibold text-white">
                    Click to choose a thumbnail image file
                  </p>
                  <p className="text-xs text-gray-500">
                    Supports PNG, JPG, or WEBP (Max 2MB)
                  </p>
                </div>
              )}
            </div>
            {errors.image && <p className="text-red-400 text-xs mt-1">{errors.image}</p>}
          </div>
        </Fieldset>

        {errors.form && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {errors.form}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2"
        >
          <i className="gi gi-plus-circle text-lg" />
          Submit Prompt for Review
        </Button>
      </Form>
    </div>
  );
}