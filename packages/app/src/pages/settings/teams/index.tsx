import React, { ReactElement } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useRestrictedSubscriptionRoute } from '../../../billing/hooks/useRestrictedSubscriptionRoute'
import { Button } from '../../../components/button/Button'
import { SettingsSection } from '../../../components/settingsSection/SettingsSection'
import { SkeletonLoader } from '../../../components/skeletonLoader/SkeletonLoader'
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '../../../components/table/Table'
import { routes } from '../../../router/routes'
import { useTeams } from '../../../teams/hooks/useTeams'
import { SettingsTeamsRow } from './components/SettingsTeamRow'

export const SettingsTeams = (): ReactElement => {
  useRestrictedSubscriptionRoute()
  const navigate = useNavigate()
  const { data: teams, isLoading } = useTeams()

  return (
    <main className="h-full">
      <SettingsSection
        className="h-full border-b-0"
        title="Teams"
        description="Add or edit teams in your organisation."
        fullWidth
        action={
          <Button
            onClick={() => {
              navigate(routes.settingsAddTeam)
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

              <TableHeaderCell />
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
                return <SettingsTeamsRow key={team.id} team={team} />
              })
            ) : (
              <TableRow>
                <TableCell>No teams.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </SettingsSection>

      <Outlet />
    </main>
  )
}
