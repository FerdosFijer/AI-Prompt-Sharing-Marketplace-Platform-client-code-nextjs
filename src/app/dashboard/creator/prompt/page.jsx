// src/app/dashboard/creator/prompt/page.jsx
import { getUserPrompts } from '@/lib/api/prompts';
import { Button, Chip, Table, Tooltip } from '@heroui/react';
import React from 'react';
import { Eye, Pencil, TrashBin } from '@gravity-ui/icons';
import { getUserSession } from '@/lib/core/session';

const PromtPage = async () => {
  // FIX: Added 'await' here
  const user = await getUserSession();
  const userId = user?.id;
  const prompts = (await getUserPrompts(userId)) || [];

  const statusColorMap = {
    approved: 'success',
    pending: 'warning',
    rejected: 'danger',
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Prompts</h1>

      <Table>
        <Table.ResizableContainer>
          <Table.Content aria-label="User Prompts Table" className="min-w-[800px]">
            <Table.Header>
              <Table.Column isRowHeader defaultWidth="2fr" id="title" minWidth={200}>
                Title
                <Table.ColumnResizer />
              </Table.Column>
              
              <Table.Column defaultWidth="1fr" id="category" minWidth={140}>
                Category
                <Table.ColumnResizer />
              </Table.Column>
              
              <Table.Column defaultWidth="1fr" id="aiTool" minWidth={120}>
                AI Tool
                <Table.ColumnResizer />
              </Table.Column>
              
              <Table.Column defaultWidth="1fr" id="status" minWidth={120}>
                Status
                <Table.ColumnResizer />
              </Table.Column>
              
              <Table.Column defaultWidth="1fr" id="actions" minWidth={140}>
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body emptyContent="No prompts found for this user.">
              {prompts.map((prompt) => (
                <Table.Row key={prompt._id.toString()}>
                  <Table.Cell>
                    <div>
                      <p className="font-semibold capitalize text-foreground">{prompt.title}</p>
                      <p className="text-xs text-default-500 truncate max-w-[250px]">
                        {prompt.description}
                      </p>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <span className="capitalize">{prompt.category}</span>
                  </Table.Cell>

                  <Table.Cell>
                    <span className="capitalize font-medium">{prompt.aiTool}</span>
                  </Table.Cell>

                  <Table.Cell>
                    <Chip
                      color={statusColorMap[prompt.status] || 'default'}
                      size="sm"
                      variant="soft"
                      className="capitalize"
                    >
                      {prompt.status}
                    </Chip>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex items-center gap-1">
                      <Tooltip content="View Details">
                        <Button isIconOnly size="sm" variant="light" aria-label="View Details">
                          <Eye className="w-4 h-4 text-default-600" />
                        </Button>
                      </Tooltip>

                      <Tooltip content="Edit Prompt">
                        <Button isIconOnly size="sm" variant="light" aria-label="Edit Prompt">
                          <Pencil className="w-4 h-4 text-default-600" />
                        </Button>
                      </Tooltip>

                      <Tooltip color="danger" content="Delete Prompt">
                        <Button isIconOnly size="sm" variant="light" color="danger" aria-label="Delete Prompt">
                          <TrashBin className="w-4 h-4 text-danger" />
                        </Button>
                      </Tooltip>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>
    </div>
  );
};

export default PromtPage;