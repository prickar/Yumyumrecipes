import logoImage from '/favicon.png';

const Header = () => {
  return (
    <div className="headerContainer">
      <img className="logoImage" src={logoImage} alt="logo" />
      <h1 className="headerText">YumYumRecipes</h1>
    </div>
  );
};

export default Header;
