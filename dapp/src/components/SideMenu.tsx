import { AppContext } from "@/app/layout";
import Link from "next/link";
import { FC, ReactNode, useContext } from "react";

interface SideMenuProps {
  children: ReactNode;
}

const SideMenu: FC<SideMenuProps> = ({ children }) => {
  const { account } = useContext(AppContext);

  return (
    <div className="min-h-screen flex">
      <nav className="bg-pink-100 bg-opacity-80 w-60 shrink-0 py-8 pl-4 flex flex-col justify-between">
        <div className="text-2xl font-black px-4 py-2 rounded-lg shadow-lg w-fit">
          미니 NFT 마켓
        </div>
        <div className="grow pt-12 flex flex-col">
          <Link href="/">
            <button className="btn-style">NFT's</button>
          </Link>
          <Link href="/mint">
            <button className="btn-style mt-4">민팅하기</button>
          </Link>
          {account && (
            <Link href="/my-nft">
              <button className="btn-style mt-4">나의 NFT</button>
            </Link>
          )}
          <Link href="/sale-nft">
            <button className="btn-style mt-4">NFT 마켓</button>
          </Link>
        </div>
        <div className="text-gray-600">NFT</div>
      </nav>
      {children}
    </div>
  );
};

export default SideMenu;
