import './Logo.scss';

export const Logo = () => {
  return (
    <section className="logo">
      <img
        src="./favicon.ico"
        alt="bullet-logo"
        className="logo__img"
        title='bullet-logo'
      />

      <p className="logo__border" />

      <h1 className="logo__title">BATTLESHIPS</h1>
    </section>
  )
}