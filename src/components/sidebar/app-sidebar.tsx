import * as React from "react"
import {
  AudioWaveform,
  ChartGantt,
  Command,
  ListChecks,
  SquareKanban,
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { TeamSwitcher } from "@/components/sidebar/team-switcher"
import {
  Sidebar,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"


const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: Command,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
}

export interface NavMainItem {
  title: string
  url: string
  icon: React.ElementType
  isActive: boolean
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
  const [navMain, setNavMain] = React.useState<NavMainItem[]>([
    {
      title: "List",
      url: "/",
      icon: ListChecks,
      isActive: true,
    },
    {
      title: "Board",
      url: "/board",
      icon: SquareKanban,
      isActive: false,
    },
    {
      title: "Timeline",
      url: "/timeline",
      icon: ChartGantt,
      isActive: false,
    },
  ]);

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={navMain} setActiveItem={setNavMain}/>
      </SidebarHeader>
      <SidebarRail />
    </Sidebar>
  )
}
