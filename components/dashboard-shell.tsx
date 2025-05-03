import { cn } from "@/lib/utils";

// 型定義
// extendsは継承を意味する
// React.HTMLAttributes<HTMLDivElement>を継承している
interface DashBoardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function DashBoardShell({
  children,
  className,
  ...props
}: DashBoardShellProps) {
  return (
    <div className={cn("grid items-center gap-8", className)} {...props}>
      {children}
    </div>
  );
}
