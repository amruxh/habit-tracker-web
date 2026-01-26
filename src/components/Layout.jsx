import Header from "./Header";
import SideNav from "./SideNav";

const Layout = ({ children }) => {
  return (
    <div className="size-full">
      <Header />
      <main className="size-full flex">
        <SideNav />
        <section className="flex-1">
          {children}
        </section>
      </main>
    </div>
  );
};

export default Layout;
