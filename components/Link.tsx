interface LinkProps {
  url?: string;
  children?: React.ReactElement;
}

const Link = ({ url, children }: LinkProps) => {
  return (
    <a
      href='#'
      onClick={(e) => {
        e.preventDefault();
        browser.tabs.update({ url });
      }}
    >
      {children}
    </a>
  );
};

export { Link };
