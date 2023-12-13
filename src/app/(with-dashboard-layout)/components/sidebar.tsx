"use client";

import {
  cloneElement,
  Fragment,
  memo,
  useCallback,
  useContext,
  type ReactElement,
} from "react";
import CustomLink from "next/link";
import { usePathname } from "next/navigation";

import {
  ArchiveRestore,
  Banknote,
  BarChart,
  Box,
  Boxes,
  Briefcase,
  GitCompare,
  HelpCircle,
  Keyboard,
  LayoutPanelLeft,
  LifeBuoy,
  RotateCcw,
  Settings,
  ShoppingCart,
  Truck,
  UserCheck,
  Users,
  WalletCards,
  Wrench,
} from "lucide-react";

import { Button } from "~/shared/shadcn/ui/button";
import { ScrollArea } from "~/shared/shadcn/ui/scroll-area";
import { Separator } from "~/shared/shadcn/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/shared/shadcn/ui/tooltip";

import {
  LayoutContext,
  type LayoutContextType,
} from "~/app/(with-dashboard-layout)/components/layout-context-provider";

import { Icons } from "~/lib/icons";
import { cn } from "~/lib/utils";

const pages: Record<
  string,
  {
    subTitle?: string;
    name?: string;
    href?: string;
    icon?: ReactElement;
    subMenu?: Array<{
      name: string;
      href: string;
      icon: ReactElement;
    }>;
  }
> = {
  home: {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutPanelLeft />,
  },
  menu: {
    subTitle: "Menu",
    subMenu: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: <LayoutPanelLeft />,
      },
      {
        name: "Devices",
        href: "/devices",
        icon: <Boxes />,
      },
      {
        name: "Reports",
        href: "/reports",
        icon: <BarChart />,
      },
    ],
  },
  mainMenu: {
    subTitle: "Main Menu",
    subMenu: [
      {
        name: "Sales Orders",
        href: "/salesOrders",
        icon: <ShoppingCart />,
      },
      {
        name: "Purchase Orders",
        href: "/purchaseOrders",
        icon: <WalletCards />,
      },
      {
        name: "Shipments",
        href: "/shipments",
        icon: <Truck />,
      },
      {
        name: "Returns",
        href: "/returns",
        icon: <RotateCcw />,
      },
      {
        name: "Payments",
        href: "/payments",
        icon: <Banknote />,
      },
      {
        name: "Reports",
        href: "/reports",
        icon: <BarChart />,
      },
    ],
  },
  production: {
    subTitle: "Production",
    subMenu: [
      {
        name: "Fulfillment",
        href: "/fulfillment",
        icon: <GitCompare />,
      },
      {
        name: "Inventory Requisition",
        href: "/requisition",
        icon: <ArchiveRestore />,
      },
      {
        name: "Development Requests",
        href: "/developmentRequests",
        icon: <Keyboard />,
      },
    ],
  },
  inventory: {
    subTitle: "Items",
    subMenu: [
      {
        name: "Products",
        href: "/products",
        icon: <Box />,
      },
      {
        name: "Materials",
        href: "/materials",
        icon: <Boxes />,
      },
      {
        name: "Tools",
        href: "/tools",
        icon: <Wrench />,
      },
    ],
  },
  partners: {
    subTitle: "Partners",
    subMenu: [
      {
        name: "Customers",
        href: "/customers",
        icon: <Users />,
      },
      {
        name: "Vendors",
        href: "/vendors",
        icon: <Briefcase />,
      },
    ],
  },
  support: {
    subTitle: "Support",
    subMenu: [
      {
        name: "Resolution Requests",
        href: "/resolutionRequests",
        icon: <LifeBuoy />,
      },
    ],
  },
  general: {
    subTitle: "General",
    subMenu: [
      {
        name: "Users",
        href: "/users",
        icon: <UserCheck />,
      },
      {
        name: "Settings",
        href: "/settings",
        icon: <Settings />,
      },
      {
        name: "Help",
        href: "/help",
        icon: <HelpCircle />,
      },
    ],
  },
};

const SidebarButton = memo(
  ({
    name,
    link,
    icon,
    isActive,
    isIconsOnly,
  }: {
    name: string;
    link: string;
    icon: ReactElement;
    isActive: boolean;
    isIconsOnly: boolean;
  }) => {
    return (
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <CustomLink href={link} className={"m-0 w-full"}>
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start truncate border border-transparent px-2 text-primary/80 shadow-none duration-150",
                isActive && "border-primary/10 text-primary",
                isIconsOnly && "w-fit",
              )}
            >
              {icon && (
                <span className={"shrink-0"}>
                  {cloneElement(icon, {
                    className: cn("h-5 w-5", isActive && "stroke-current"),
                  })}
                </span>
              )}
              {!isIconsOnly && <span className={cn("ml-2")}>{name}</span>}
            </Button>
          </CustomLink>
        </TooltipTrigger>
        <TooltipContent
          side={"right"}
          className={cn("z-[100]", !isIconsOnly && "hidden")}
          sideOffset={4}
        >
          {name}
        </TooltipContent>
      </Tooltip>
    );
  },
);
SidebarButton.displayName = "SidebarButton";

const SidebarList = memo(({ iconsOnly }: { iconsOnly: boolean }) => {
  const pathname = usePathname();

  const checkIfActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === href;
      return pathname.startsWith(href);
    },
    [pathname],
  );

  return (
    <div className={"h-full w-full border-r border-border"}>
      <ScrollArea
        className={cn(
          "h-full w-60 transition-all duration-150 ease-in-out",
          iconsOnly && "w-16",
        )}
        scrollHideDelay={300}
      >
        <div className={"flex flex-col justify-center gap-2 px-3 py-4"}>
          {Object.entries(pages).map(([key, page]) => {
            if (page?.subTitle) {
              return (
                <Fragment key={page.subTitle}>
                  {!iconsOnly ? (
                    <p
                      className={
                        "!mb-1 !mt-3 px-2 text-xs uppercase leading-4 text-muted-foreground duration-150"
                      }
                    >
                      {page.subTitle}
                    </p>
                  ) : (
                    <Separator className={cn("!my-2 bg-primary/20")} />
                  )}

                  {page.subMenu && (
                    <div className={"flex flex-col gap-2"}>
                      {page.subMenu?.map((subPage) => (
                        <SidebarButton
                          key={subPage.name}
                          name={subPage.name}
                          link={subPage.href}
                          icon={subPage.icon}
                          isActive={checkIfActive(subPage.href)}
                          isIconsOnly={iconsOnly}
                        />
                      ))}
                    </div>
                  )}
                </Fragment>
              );
            }
            if (page?.name) {
              return (
                <SidebarButton
                  key={page.name}
                  name={page.name}
                  link={page?.href ?? ""}
                  icon={page?.icon ?? <></>}
                  isActive={checkIfActive(page?.href ?? "")}
                  isIconsOnly={iconsOnly}
                />
              );
            }
          })}
        </div>
      </ScrollArea>
    </div>
  );
});
SidebarList.displayName = "SidebarList";

const DesktopSidebar = memo(() => {
  const { isIconsOnly, toggleIconsOnly } =
    useContext<LayoutContextType>(LayoutContext);

  // const countRef = useRef(0);
  // countRef.current += 1;
  //
  // console.log(
  //   "Desktop Sidebar rendering " + countRef.current + " " + Date.now(),
  // );
  return (
    <div className={"hidden duration-150 xl:relative xl:block"}>
      <SidebarList iconsOnly={isIconsOnly} />
      <Button
        variant={"outline"}
        size={"icon"}
        className={cn(
          "absolute inset-y-0 -right-2.5 z-50 m-auto h-5 w-5 rotate-0 rounded-full border-primary/20 transition-all duration-300 hover:border-sample",
          isIconsOnly && "rotate-180",
        )}
        onClick={toggleIconsOnly}
      >
        <Icons.arrowLeft className={"h-3 w-3"} />
      </Button>
    </div>
  );
});
DesktopSidebar.displayName = "DesktopSidebar";

/*const MobileSidebar = () => {
  const { isSidebarOpen, toggleSidebar } =
    useContext<SidebarContextType>(SidebarContext);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280 && isSidebarOpen) {
        toggleSidebar();
      }
    };

    // Listener for window resize event
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const countRef = useRef(0);
  countRef.current += 1;

  console.log(
    "Mobile Sidebar rendering " + countRef.current + " " + Date.now(),
  );

  return (
    <Sheet
      onOpenChange={() => {
        if (window.innerWidth <= 1280) {
          toggleSidebar();
        }
      }}
      open={isSidebarOpen}
    >
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Ezerka Commerce</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servsdsders.
          </SheetDescription>
          {/!*<SidebarList iconsOnly={false} />*!/}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};*/

const Sidebar = () => {
  return (
    <>
      <DesktopSidebar />
      {/*<MobileSidebar />*/}
    </>
  );
};

export default Sidebar;
