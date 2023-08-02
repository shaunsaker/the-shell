import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button/Button'
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from './Table'

const meta = {
  title: 'Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>

            <TableHeaderCell>Created By</TableHeaderCell>

            <TableHeaderCell>Team Members</TableHeaderCell>

            <TableHeaderCell>Date Created</TableHeaderCell>

            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>Frank's A Team</TableCell>

            <TableCell>Frank Gallagher</TableCell>

            <TableCell>1</TableCell>

            <TableCell>23 June 1988</TableCell>

            <TableCell>
              <Button variant="light">Edit</Button>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Frank's B Team</TableCell>

            <TableCell>Frank Gallagher</TableCell>

            <TableCell>6</TableCell>

            <TableCell>23 June 1988</TableCell>

            <TableCell>
              <Button variant="light">Edit</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </>
    ),
  },
}
