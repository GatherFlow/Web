import { Avatar, AvatarFallback, AvatarImage } from "@/core/components/ui/avatar";
import { Badge } from "@/core/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/core/components/ui/table";
import type { AdminUser } from "@/core/types";
import { capitalize } from "@/core/utils";
import React from "react";
import { UserTableDropdown } from "./user-table-dropdown";
import { useTranslation } from "react-i18next";

interface Props {
  users: AdminUser[]
}

export const UsersTable: React.FC<Props> = ({ users }) => {
  const { t } = useTranslation()
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {[1,2,3,4,5,6].map((_, i) => (
            <TableHead
              className={i === 5 ? 'text-right' : ''}
            >
              {t(`admin.users.table.head.${i}`)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.firstName} />
                  <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{`${user.firstName} ${user.lastName}`}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge>Free</Badge>
            </TableCell>
            <TableCell>12</TableCell>
            <TableCell>
              <Badge>{capitalize(user.type)}</Badge>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">{capitalize(user.role)}</TableCell>
            <TableCell className="text-right">
              <UserTableDropdown user={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}