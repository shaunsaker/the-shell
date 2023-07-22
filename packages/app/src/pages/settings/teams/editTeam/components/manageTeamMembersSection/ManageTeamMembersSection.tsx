import { Button, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react'
import React, { ReactElement } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { SettingsSection } from '../../../../../../components/settingsSection/SettingsSection'
import { SkeletonLoader } from '../../../../../../components/skeletonLoader/SkeletonLoader'
import { useIsLoggedInUserTeamAdmin } from '../../../../../../hooks/teams/useIsLoggedInUserTeamAdmin'
import { useTeam } from '../../../../../../hooks/teams/useTeam'
import { routes, TEAM_ID_PARAM, TEAM_MEMBER_ID_PARAM } from '../../../../../../routes'
import { formatDate } from '../../../../../../utils/formatDate'
import { formatTeamMemberName } from '../../../../../../utils/formatTeamMemberName'
import { formatTeamMemberRole } from '../../../../../../utils/formatTeamMemberRole'
import { formatTeamMemberStatus } from '../../../../../../utils/formatTeamMemberStatus'

export const ManageTeamMembersSection = (): ReactElement => {
  const isLoggedInUserTeamAdmin = useIsLoggedInUserTeamAdmin()
  const { data: team, isLoading } = useTeam()
  const { teamId = '' } = useParams()
  const navigate = useNavigate()

  const loading = isLoading
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
            <TableHeaderCell className="bg-tremor-content-inverted dark:bg-dark-tremor-content-inverted">
              Name
            </TableHeaderCell>

            <TableHeaderCell className="bg-tremor-content-inverted dark:bg-dark-tremor-content-inverted">
              Email
            </TableHeaderCell>

            <TableHeaderCell className="bg-tremor-content-inverted dark:bg-dark-tremor-content-inverted">
              Status
            </TableHeaderCell>

            <TableHeaderCell className="bg-tremor-content-inverted dark:bg-dark-tremor-content-inverted">
              Role
            </TableHeaderCell>

            <TableHeaderCell className="bg-tremor-content-inverted dark:bg-dark-tremor-content-inverted">
              Date added
            </TableHeaderCell>

            <TableHeaderCell className="bg-tremor-content-inverted dark:bg-dark-tremor-content-inverted"></TableHeaderCell>
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
              {team?.team_members.map(teamMember => {
                return (
                  <TableRow key={teamMember.user_id}>
                    <TableCell>{formatTeamMemberName(teamMember)}</TableCell>

                    <TableCell>{teamMember.email}</TableCell>

                    <TableCell>{formatTeamMemberStatus(teamMember.status)}</TableCell>

                    <TableCell>{formatTeamMemberRole(teamMember.role)}</TableCell>

                    <TableCell>{formatDate(teamMember.created_at)}</TableCell>

                    <TableCell>
                      <Button
                        variant="light"
                        disabled={!isLoggedInUserTeamAdmin}
                        onClick={() => {
                          navigate(
                            routes.settingsEditTeamMember
                              .replace(TEAM_ID_PARAM, team.id.toString())
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
