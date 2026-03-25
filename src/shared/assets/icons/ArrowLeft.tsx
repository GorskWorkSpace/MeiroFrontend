interface ArrowLeftProps {
  size?: string;
  color?: string;
}

export const ArrowLeft = ({
  size = "12",
  color = "currentColor",
}: ArrowLeftProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.0701 12C20.0701 12.5523 19.6224 12.9999 19.0702 12.9999H7.34213L12.7062 18.364C13.0967 18.7545 13.0967 19.3876 12.7062 19.7782C12.3157 20.1687 11.6825 20.1687 11.292 19.7782L4.22092 12.7071C3.83039 12.3166 3.83039 11.6834 4.22092 11.2929L11.292 4.22183C11.6825 3.8313 12.3157 3.8313 12.7062 4.22183C13.0967 4.61235 13.0967 5.24551 12.7062 5.63604L7.34213 11.0001H19.0702C19.6224 11.0001 20.0701 11.4477 20.0701 12Z"
        fill={color}
      />
    </svg>
  );
};
