import Link from 'next/link'
import { useState } from 'react'
import LoginModal from './Modals/LoginModal'
import EditModal from './Modals/EditModal'
import UserDropdown from './Dropdowns/UserDropdown'
import MenuDropdown from './Dropdowns/MenuDropdown'

export default function Layout({ children, setUser, user,loginModal, setLoginModal }) {
  const [editModal, setEditModal] = useState(false)
  const [menuModal, setMenuModal] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [error, setError] = useState(null)


  return (
    <div>
      <div >
        <div className='layout'>

          <div id="mobileMenu">
            <img id="menuImg"
              src="https://cdn.discordapp.com/attachments/1010012975253422103/1073103799708819476/PngItem_6342297.png"
              alt="My Image"
              onClick={() => setMenuModal(!menuModal)}
            />
            {menuModal ? <MenuDropdown setModal={setMenuModal} /> : null}
          </div>

          <ul className='menu'>
            <li style={{ marginLeft: "4.5vw" }} >
              <Link
                href="/">HOME</Link>
            </li>
            <li>
              <Link
                href="/prefrences">MY STUFF</Link>
            </li>
            <li >
              <Link
                href="/browse">BROWSE</Link>
            </li>

          </ul>

          <ul style={{ marginTop: "5px" }}>
            <li>
              <span style={{ textDecoration: "underline" }} id="login" onClick={() => {
                if (user) {
                  setDropdown(!dropdown)
                  setLoginModal(false)
                  setError(null)

                } else {
                  setLoginModal(!loginModal)
                  setError(null)
                }
              }}>

                {user ? user.name : "Log in"}
                {dropdown ? <UserDropdown setEditModal={setEditModal} setUser={setUser} /> : null}
              </span>
              <Link href="/"><img id="logo" src="https://download.logo.wine/logo/Hulu/Hulu-Logo.wine.png" /></Link>
            </li>
          </ul>
        </div>




        {editModal ? <EditModal
          setModal={setEditModal}
          error={error} setError={setError}
          user={user} setUser={setUser} /> : null}
        {loginModal ? <LoginModal
          setModal={setLoginModal}
          error={error} setError={setError}
          setUser={setUser} /> : null}





      </div>





      {children}</div>
  )
}
