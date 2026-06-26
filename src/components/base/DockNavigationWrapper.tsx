import { TooltipProvider } from '~/components/ui/tooltip'
import DockNavigation from './DockNavigation'

export default function DockNavigationWrapper() {
  return (
    <TooltipProvider delayDuration={0}>
      <DockNavigation />
    </TooltipProvider>
  )
}
