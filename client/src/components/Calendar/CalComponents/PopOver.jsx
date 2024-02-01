import { Popover, Whisper, Button } from 'rsuite';

export const App = ({ previewEvents, popupPosition }) => (
  <Whisper
    followCursor
    speaker={<Popover>This is a Popover that follow cursor</Popover>}
  >
    <Button>Hover me</Button>
  </Whisper>
);
