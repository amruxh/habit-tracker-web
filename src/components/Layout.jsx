import Header from "./Header";
import SideNav from "./SideNav";
import BottomNav from "./BottomNav";

const Layout = ({ children }) => {
  return (
    <div className="size-full flex flex-col">
      <Header />
      <main className="flex-1 flex overflow-hidden">
        <SideNav />
        <section className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {children}
        </section>
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;
