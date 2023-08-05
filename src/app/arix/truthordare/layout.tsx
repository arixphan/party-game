import { SideBarItem } from "./components/SibarItem";

export default function TruthOrDareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-full flex-auto flex">
      <aside className="flex flex-col h-auto w-64 min-w-[16rem] px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav className="-mx-3 space-y-6 ">
            <div className="space-y-3 ">
              <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                Types
              </label>
              <SideBarItem
                name="common"
                href="?kind=common"
                iconPath="/icon/gamepad.svg"
              >
                Common
              </SideBarItem>
              <SideBarItem
                name="adult"
                href="?kind=adult"
                iconPath="/icon/adult-18.svg"
              >
                Adult
              </SideBarItem>
              <SideBarItem
                name="couple"
                href="?kind=couple"
                iconPath="/icon/heart.svg"
              >
                Couple
              </SideBarItem>
            </div>
          </nav>
        </div>
      </aside>
      <section className="flex-auto">{children}</section>
    </div>
  );
}
