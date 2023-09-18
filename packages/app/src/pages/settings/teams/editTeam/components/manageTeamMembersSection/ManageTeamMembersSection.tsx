import React, { ReactElement } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '../../../../../../components/button/Button'
import { SettingsSection } from '../../../../../../components/settingsSection/SettingsSection'
import { SkeletonLoader } from '../../../../../../components/skeletonLoader/SkeletonLoader'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '../../../../../../components/table/Table'
import { routes, TEAM_ID_PARAM, TEAM_MEMBER_ID_PARAM } from '../../../../../../routes'
import { useIsLoggedInUserTeamAdmin } from '../../../../../../teams/hooks/useIsLoggedInUserTeamAdmin'
import { useTeam } from '../../../../../../teams/hooks/useTeam'
import { useTeamMembers } from '../../../../../../teams/hooks/useTeamMembers'
import { formatDate } from '../../../../../../utils/formatDate'
import { formatTeamMemberName } from '../../../../../../utils/formatTeamMemberName'
import { formatTeamMemberRole } from '../../../../../../utils/formatTeamMemberRole'
import { formatTeamMemberStatus } from '../../../../../../utils/formatTeamMemberStatus'

export const ManageTeamMembersSection = (): ReactElement => {
  const { data: isLoggedInUserTeamAdmin, isLoading: isLoggedInUserTeamAdminLoading } = useIsLoggedInUserTeamAdmin()
  const { data: team, isLoading: isTeamLoading } = useTeam()
  const { data: teamMembers, isLoading: isTeamMembersLoading } = useTeamMembers(team?.id)
  const { teamId = '' } = useParams()
  const navigate = useNavigate()

  const loading = isLoggedInUserTeamAdminLoading || isTeamLoading || isTeamMembersLoading
  const disabled = !isLoggedInUserTeamAdmin || loading

  return (
    <SettingsSection
      title={isLoggedInUserTeamAdmin ? 'Manage team members' : 'View team members'}
      description={
        isLoggedInUserTeamAdmin
          ? 'Add, update or remove team members from your team.'
          : 'View team members in your team.'
      }
      action={
        <Button
          disabled={disabled}
          onClick={() => {
            navigate(routes.settingsInviteTeamMembers.replace(TEAM_ID_PARAM, teamId))
          }}
        >
          Invite team members
        </Button>
      }
      fullWidth
    >
      <Table className="max-h-[20rem]">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>

            <TableHeaderCell>Email</TableHeaderCell>

            <TableHeaderCell>Status</TableHeaderCell>

            <TableHeaderCell>Role</TableHeaderCell>

            <TableHeaderCell>Date added</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell>
                <SkeletonLoader />
              </TableCell>

              <TableCell>
                <SkeletonLoader />
              </TableCell>

              <TableCell>
                <SkeletonLoader />
              </TableCell>

              <TableCell>
                <SkeletonLoader />
              </TableCell>

              <TableCell>
                <SkeletonLoader />
              </TableCell>

              <TableCell>
                <SkeletonLoader />
              </TableCell>
            </TableRow>
          ) : (
            <>
              {teamMembers?.map(teamMember => {
                return (
                  <TableRow key={teamMember.id}>
                    <TableCell>{formatTeamMemberName(teamMember)}</TableCell>

                    <TableCell>{teamMember.email}</TableCell>

                    <TableCell>{formatTeamMemberStatus(teamMember.status)}</TableCell>

                    <TableCell>{formatTeamMemberRole(teamMember.role)}</TableCell>

                    <TableCell>{formatDate(teamMember.createdAt)}</TableCell>

                    <TableCell>
                      <Button
                        variant="light"
                        disabled={!isLoggedInUserTeamAdmin}
                        onClick={() => {
                          navigate(
                            routes.settingsEditTeamMember
                              .replace(TEAM_ID_PARAM, team?.id.toString() || '')
                              .replace(TEAM_MEMBER_ID_PARAM, teamMember.id.toString()),
                          )
                        }}
                      >
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </>
          )}
        </TableBody>
      </Table>
    </SettingsSection>
  )
}
