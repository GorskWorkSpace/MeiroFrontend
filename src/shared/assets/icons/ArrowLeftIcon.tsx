interface ArrowLeftIconProps {
  onClick?: () => void;
}

export const ArrowLeftIcon = ({ onClick }: ArrowLeftIconProps) => {
  return (
    <svg
      onClick={onClick}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.071 12C20.071 12.5523 19.6234 12.9999 19.0711 12.9999H7.34311L12.7072 18.364C13.0977 18.7545 13.0977 19.3876 12.7072 19.7782C12.3167 20.1687 11.6835 20.1687 11.293 19.7782L4.2219 12.7071C3.83137 12.3166 3.83137 11.6834 4.2219 11.2929L11.293 4.22183C11.6835 3.8313 12.3167 3.8313 12.7072 4.22183C13.0977 4.61235 13.0977 5.24551 12.7072 5.63604L7.34311 11.0001H19.0711C19.6234 11.0001 20.071 11.4477 20.071 12Z"
        fill="var(--icon-color)"
      />
    </svg>
  );
};
