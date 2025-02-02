import { ClockIcon } from '@radix-ui/react-icons';

interface ReadingTimeProps {
  minutes: number;
  words: number;
}

export function ReadingTime({ minutes }: ReadingTimeProps) {
  return (
    <div className="flex items-center gap-2 text-gray-500 text-sm">
      <ClockIcon className="w-4 h-4" />
      <span>预计阅读 {minutes} 分钟</span>
      <span className="text-gray-300">·</span>
    </div>
  );
}
