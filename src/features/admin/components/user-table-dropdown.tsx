import { Button } from "@/core/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/core/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash2 } from "lucide-react"
import { EditUserDialog } from "./edit-user-dialog"
import type { AdminUser } from "@/core/types"
import { DeleteUserAlert } from "./delete-user-alert"
import { useAuthStore } from "@/features/auth/stores"

interface Props {
  user: AdminUser
}

export const UserTableDropdown: React.FC<Props> = (props) => {
  const currentUser = useAuthStore((select) => select.user)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <EditUserDialog {...props}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Edit className="mr-2 h-4 w-4" />
            Edit user
          </DropdownMenuItem>
        </EditUserDialog>
        <DropdownMenuSeparator />
        <DeleteUserAlert {...props}>
          <DropdownMenuItem
            className="text-red-600"
            onSelect={(e) => e.preventDefault()}
            disabled={currentUser?.id === props.user.id}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete user
          </DropdownMenuItem>
        </DeleteUserAlert>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
