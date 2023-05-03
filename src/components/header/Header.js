import { useEffect, useState } from 'react'
import styles from "./Header.module.scss"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaTimes, FaUserCircle } from 'react-icons/fa'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from 'react-toastify'
import { auth } from '../../firebase/config'
import { useDispatch } from 'react-redux'
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../redux/slice/authSlice'
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink'
import AdminOnlyRoute, { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute'

const logo = (
  <div className={styles.logo}>
    <Link to='/'>
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
)

const cart = (
  <span className={styles.cart}>
    <Link to='/cart'>
      Cart
      <FaShoppingCart size={20} />
      <p>0</p>
    </Link>
  </span>
)

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "")

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setdisplayName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Monitor currently sign in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user)

        if (user.displayName == null) {
          // const u1 = user.email.slice(0, -10);
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          console.log(uName);
          setdisplayName(uName);

        } else {
          setdisplayName(user.displayName);
        }

        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: user.displayName ? user.displayName : displayName,
          userID: user.uid
        }))
      } else {
        setdisplayName("");
        dispatch(REMOVE_ACTIVE_USER())
      }
    });
  }, [dispatch, displayName])

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  };

  const hideMenu = () => {
    setShowMenu(false)
  }

  const logoutUser = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      toast.success("Logout Successfully...");
      navigate("/")
    }).catch((error) => {
      // An error happened.
      toast.error(error.message);
    });
  }

  return (
    <header>
      <div className={styles.header}>
        {logo}

        <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-menu"]}`}>

          <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}`} onClick={hideMenu}></div>

          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color='#fff' />
            </li>

            <li>
              <AdminOnlyLink>
                <Link to="/admin/home">
                <button className='--btn --btn-primary'>Admin</button>
                </Link>
              </AdminOnlyLink>
            </li>

            <li>
              <NavLink to='/' className={activeLink}>Home</NavLink>
            </li>
            <li>
              <NavLink to='/contact'>
                Contact Us
              </NavLink>
            </li>
          </ul>


          <div className={styles['header-right']} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLogout>
                <NavLink to='/login'>Login</NavLink>
              </ShowOnLogout>

              <ShowOnLogin>
                <a href='#home' style={{color: "#ff7722"}}>
                  <FaUserCircle size={16} /> Hi, {displayName}
                </a>
              </ShowOnLogin>

              <ShowOnLogout>
                <NavLink to='/register'>Register</NavLink>
              </ShowOnLogout>

              <ShowOnLogin>
                <NavLink to='/order-history'>My Orders</NavLink>
              </ShowOnLogin>

              <ShowOnLogin>
                <NavLink to='/' onClick={logoutUser}>Log out</NavLink>
              </ShowOnLogin>
            </span>
            {cart}
          </div>

        </nav>

        {/* Responsive header */}
        <div className={styles['menu-icon']}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>

      </div>

    </header>
  )
}

export default Header