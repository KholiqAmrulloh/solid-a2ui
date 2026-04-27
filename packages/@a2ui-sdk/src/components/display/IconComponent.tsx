/**
 * IconComponent - Displays icons from the A2UI icon set.
 */
import type { IconComponentProps } from "@a2ui-sdk/types/0.9/standard-catalog";
import { useStringBinding } from "../../hooks/useDataBinding";
import {
  User,
  Plus,
  ArrowLeft,
  ArrowRight,
  Paperclip,
  Calendar,
  Phone,
  Camera,
  Check,
  X,
  Trash2,
  Download,
  Pencil,
  CalendarDays,
  AlertCircle,
  Heart,
  HeartOff,
  Folder,
  HelpCircle,
  Home,
  Info,
  MapPin,
  Lock,
  Unlock,
  Mail,
  Menu,
  MoreVertical,
  MoreHorizontal,
  BellOff,
  Bell,
  CreditCard,
  UserCircle,
  Image,
  Printer,
  RefreshCw,
  Search,
  Send,
  Settings,
  Share2,
  ShoppingCart,
  Star,
  StarHalf,
  StarOff,
  Upload,
  Eye,
  EyeOff,
  AlertTriangle,
  type LucideIcon,
} from "lucide-solid";
import { A2UIComponentProps } from "../types";
import { cn } from "../../lib/utils";

/**
 * Maps A2UI icon names to Lucide icons.
 */
const iconMap: Record<string, LucideIcon> = {
  accountCircle: UserCircle,
  add: Plus,
  arrowBack: ArrowLeft,
  arrowForward: ArrowRight,
  attachFile: Paperclip,
  calendarToday: Calendar,
  call: Phone,
  camera: Camera,
  check: Check,
  close: X,
  delete: Trash2,
  download: Download,
  edit: Pencil,
  event: CalendarDays,
  error: AlertCircle,
  favorite: Heart,
  favoriteOff: HeartOff,
  folder: Folder,
  help: HelpCircle,
  home: Home,
  info: Info,
  locationOn: MapPin,
  lock: Lock,
  lockOpen: Unlock,
  mail: Mail,
  menu: Menu,
  moreVert: MoreVertical,
  moreHoriz: MoreHorizontal,
  notificationsOff: BellOff,
  notifications: Bell,
  payment: CreditCard,
  person: User,
  phone: Phone,
  photo: Image,
  print: Printer,
  refresh: RefreshCw,
  search: Search,
  send: Send,
  settings: Settings,
  share: Share2,
  shoppingCart: ShoppingCart,
  star: Star,
  starHalf: StarHalf,
  starOff: StarOff,
  upload: Upload,
  visibility: Eye,
  visibilityOff: EyeOff,
  warning: AlertTriangle,
};

/**
 * Icon component for displaying icons from the A2UI icon set.
 */
export function IconComponent(props: A2UIComponentProps<IconComponentProps>) {
  const iconName = useStringBinding(props.surfaceId, props.name, "");

  const Icon = () => {
    const name = iconName();
    if (!name) return null;

    const icon = iconMap[name];
    if (!icon) {
      console.warn(`[A2UI 0.9] Unknown icon name: ${name}`);
      return null;
    }
    return icon;
  };

  return (
    <>
      {(() => {
        const ResolvedIcon = Icon();
        if (!ResolvedIcon) return null;
        return <ResolvedIcon class={cn("w-5 h-5")} />;
      })()}
    </>
  );
}
