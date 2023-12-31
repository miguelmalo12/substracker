import {useState} from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

const ToolTip = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleTooltip = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={0} open={isOpen} onOpenChange={setIsOpen}>
        <Tooltip.Trigger asChild onClick={toggleTooltip}  >
          <button className="text-primary drop-shadow hover:border hover:border-primary inline-flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white shadow-[0_0_3px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-dark-grey">
            <p className='text-xs'>?</p>
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="max-w-sm data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-center text-dark-grey dark:text-light-grey select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
            sideOffset={5}
          >
            {content}
            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default ToolTip;
