'use client'
import { Button, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'

import { SettingsSection } from '../../../components/settingsSection/SettingsSection'
import { SkeletonLoader } from '../../../components/skeletonLoader/SkeletonLoader'
import { useSession } from '../../../hooks/auth/useSession'
import { useTeams } from '../../../hooks/teams/useTeams'
import { routes, TEAM_ID_PARAM } from '../../../routes'
import { formatDate } from '../../../utils/formatDate'
import { formatTeamMemberName } from '../../../utils/formatTeamMemberName'

type SettingsTeamsProps = {
  children: ReactNode
}

export default function SettingsTeamsLayout({ children }: SettingsTeamsProps) {
  const router = useRouter()
  const { data: teams, isLoading: teamsLoading } = useTeams()
  const { data: session, isLoading: sessionLoading } = useSession()

  const isLoading = teamsLoading || sessionLoading

  return (
    <main>
      <SettingsSection
        className="border-b-0"
        title="Teams"
        description="Add or edit teams in your organisation."
        fullWidth
        action={
          <Button
            onClick={() => {
              router.push(routes.settingsAddTeam)
            }}
          >
            Add team
          </Button>
        }
      >
        <Table>
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
            {isLoading ? (
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
              </TableRow>
            ) : teams?.length ? (
              teams?.map(team => {
                const isLoggedInUserTeamAdmin = team.team_members?.some(
                  teamMember => teamMember.user_id === session?.user.id && teamMember.role === 'admin',
                )
                const createdByTeamMember = team.team_members?.find(
                  teamMember => teamMember.user_id === team.created_by,
                )

                return (
                  <TableRow key={team.id}>
                    <TableCell>{team.name}</TableCell>

                    <TableCell>{formatTeamMemberName(createdByTeamMember)}</TableCell>

                    <TableCell>{team.team_members?.length}</TableCell>

                    <TableCell>{formatDate(team.created_at)}</TableCell>

                    <TableCell>
                      <Button
                        variant="light"
                        onClick={() => {
                          router.push(routes.settingsEditTeam.replace(TEAM_ID_PARAM, team.id.toString()))
                        }}
                      >
                        {isLoggedInUserTeamAdmin ? 'Edit' : 'View'}
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell>No teams.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </SettingsSection>

      {children}
    </main>
  )
}
