import type { CSSProperties } from "react";

interface ArrowTopIconProps {
  onClick?: () => void;
  style?: CSSProperties | undefined;
}

export const ArrowTopIcon = ({ style, onClick }: ArrowTopIconProps) => {
  return (
    <svg
      onClick={onClick}
      style={style}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 9.9707C12 9.9707 11.5 10.4707 11 10.9707L5.63604 16.1925C5.24551 16.5831 4.61235 16.5831 4.22182 16.1925C3.8313 15.802 3.8313 15.1688 4.22182 14.7783L11.2929 7.70725C11.6834 7.31672 12.3166 7.31672 12.7071 7.70725L19.7782 14.7783C20.1687 15.1688 20.1687 15.802 19.7782 16.1925C19.3876 16.5831 18.7545 16.5831 18.364 16.1925L13 10.9707C12.5 10.4707 12 9.9707 12 9.9707Z"
        fill="currentColor"
      />
    </svg>
  );
};
