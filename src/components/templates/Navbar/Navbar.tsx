import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  className?: string
}

const Navbar: React.FC<Props> = ({ className }) => {
  const router = useRouter()
  const currentPage = router.pathname.split("/")[1] ?? ""

  const linkList = [{ page: "news", title: "News" }, { page: "works", title: "Works" }]

  return (
    <div className="flex ">
      <div className="w-screen bg-green-600 shadow-md py-3 px-2">
        <nav className="m-1 flex items-center">
          <Link href="/">
            <a><img src="/images/logo.svg" className="md:h-7 h-6 md:px-10 hover:opacity-70 transition duration-300" /></a>
          </Link>

          <div className="m-1 flex justify-center items-center">
            {linkList.map((l) => {
              return (<Link href={"/" + l.page} key={"navbar-" + l.page}>
                <a className="mx-3">
                  {currentPage == l.page ?
                    (<span className="
                      text-lg text-gray-200 hover:text-white
                      border-b-4 border-yellow-500
                      transition duration-300
                    "> {l.title} </span>) :
                    (<span className="text-lg text-gray-200 hover:text-white transition duration-300"> {l.title} </span>)}
                </a>
              </Link>)
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar