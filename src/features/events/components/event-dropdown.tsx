import { Button } from "@/core/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/core/components/ui/dropdown-menu"
import type { Event } from "@/core/types"
import { Link } from "@tanstack/react-router"
import { Edit, MoreHorizontal, Trash2 } from "lucide-react"
import type React from "react"
import { useDeleteEvent } from "../mutations/useDeleteEvent"

interface Props {
  event: Event
}

export const EventDropdown: React.FC<Props> = ({ event }) => {
  const { mutate } = useDeleteEvent()

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
        <DropdownMenuItem asChild>
          <Link to='/dashboard/events/$id' params={{ id: event.id.toString() }}>
            <Edit className="mr-2 h-4 w-4" /> Edit event
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600"
          onClick={() => mutate(event.id)}
        >
          <Trash2 className="mr-2 h-4 w-4" /> Delete event
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}