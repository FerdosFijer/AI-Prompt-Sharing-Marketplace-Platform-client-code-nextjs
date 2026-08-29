// src/app/dashboard/creator/prompt/new/page.jsx
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
  Description,
} from "@heroui/react";
import { ArrowUpFromLine, Plus } from "@gravity-ui/icons";
import { PromptsPost } from "@/lib/actions/prompts";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function NewPromptPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Form state for controlled inputs
  const [category, setCategory] = useState("");
  const [aiTool, setAiTool] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [visibility, setVisibility] = useState("public");

  // Upload image file to ImgBB and return display URL
  const uploadToImgBB = async (file) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      throw new Error("ImgBB API key is missing in environment variables.");
    }

    const body = new FormData();
    body.append("image", file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: body,
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error?.message || "Failed to upload image to ImgBB");
    }

    return result.data.display_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // Attach controlled state values
    data.category = category;
    data.aiTool = aiTool;
    data.difficulty = difficulty;
    data.visibility = visibility;

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

    try {
      let thumbnailUrl = "";
      // Upload image to ImgBB if a file was selected
      if (selectedFile) {
        thumbnailUrl = await uploadToImgBB(selectedFile);
      }

      const payload = {
        title: data.title,
        description: data.description,
        content: data.content,
        category: data.category,
        aiTool: data.aiTool,
        difficulty: data.difficulty,
        visibility: data.visibility,
        thumbnail: thumbnailUrl,
        tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
        copyCount: 0,
        status: "pending",
        userId: user?.id,
      };

      const result = await PromptsPost(payload);

      if (result?.error || (result?.message && !result?.success)) {
        setErrors({ form: result.error || result.message || "Failed to submit prompt." });
      } else {
        e.target.reset();
        setCategory("");
        setAiTool("");
        setDifficulty("");
        setVisibility("public");
        setSelectedFile(null);
        setPreviewImage(null);
      }
    } catch (err) {
      if (err?.digest?.startsWith("NEXT_REDIRECT")) {
        throw err;
      }
      setErrors({ form: err.message || "An unexpected error occurred. Please try again." });
    } finally {
      setIsLoading(false);
      redirect("/dashboard/creator/prompt");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: "File size exceeds 2MB limit." }));
        return;
      }
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: null }));
    }
  };

  return (
    <div className="p-6">
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
                aria-label="Prompt Title"
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
                aria-label="Short Description"
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
                aria-label="Prompt Content Template"
                rows={5}
                placeholder="Write the full, detailed prompt instructions. Use brackets to indicate variables e.g., 'Act as a [role]...'"
                className="w-full bg-[#121827] border border-gray-800 text-white placeholder-gray-500 focus:border-purple-500 rounded-lg p-3"
              />
              {errors.content && <FieldError className="text-red-400 text-xs mt-1">{errors.content}</FieldError>}
            </div>

            {/* Category & AI Engine */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1 block">
                  Category *
                </Label>
                <Select
                  className="w-full"
                  placeholder="Select Category"
                  aria-label="Category"
                  selectedKey={category}
                  onSelectionChange={(key) => setCategory(key)}
                >
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
                </Select>
                {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
              </div>

              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1 block">
                  AI Engine *
                </Label>
                <Select
                  className="w-full"
                  placeholder="Select AI Engine"
                  aria-label="AI Engine"
                  selectedKey={aiTool}
                  onSelectionChange={(key) => setAiTool(key)}
                >
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
                </Select>
                {errors.aiTool && <p className="text-red-400 text-xs mt-1">{errors.aiTool}</p>}
              </div>
            </div>

            {/* Difficulty Level */}
            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1 block">
                Difficulty Level *
              </Label>
              <Select
                className="w-full"
                placeholder="Select Level"
                aria-label="Difficulty Level"
                selectedKey={difficulty}
                onSelectionChange={(key) => setDifficulty(key)}
              >
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
              </Select>
              {errors.difficulty && <p className="text-red-400 text-xs mt-1">{errors.difficulty}</p>}
            </div>

            {/* Visibility Status */}
            <div className="flex flex-col gap-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                Visibility Status *
              </Label>
              <RadioGroup
                name="visibility"
                value={visibility}
                onChange={setVisibility}
                orientation="horizontal"
                className="flex gap-4"
              >
                <Radio value="public" className="cursor-pointer">
                  <Radio.Content className="p-2 rounded-2xl border-2">
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                    <span className="text-sm font-medium text-white">Public</span>
                  <Description className="text-xs text-gray-400">Free access</Description>
                  </Radio.Content>
                </Radio>

                <Radio value="private" className="cursor-pointer">
                  <Radio.Content className="p-2 rounded-2xl border-2">
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                    <span className="text-sm font-medium text-white">Private</span>
                  <Description className="text-xs text-gray-400">Premium lock</Description>
                  </Radio.Content>
                </Radio>
              </RadioGroup>
            </div>

            {/* Tags */}
            <TextField name="tags" className="w-full">
              <Label className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1 block">
                Tags (Comma-Separated)
              </Label>
              <Input
                aria-label="Tags (Comma-Separated)"
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
                  aria-label="Thumbnail Image Upload"
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
                  <div className="space-y-2 flex flex-col items-center justify-center">
                    <ArrowUpFromLine className="w-8 h-8 text-gray-400" />
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
            <Plus className="w-5 h-5" />
            Submit Prompt for Review
          </Button>
        </Form>
      </div>
    </div>
  );
}