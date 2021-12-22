import { EmptyDescriptionPipe } from './components/pipes/emptyDescription.pipe';
import { showHidePipe } from './components/pipes/showHide.pipe';
import { OnOffPipe } from './components/pipes/onOff.pipe';
import { EmptyDatePipe } from './components/pipes/emptyDate.pipe';
import { EmptyFieldPipe } from './components/pipes/emptyField.pipe';

export const pipesDeclarations = [
    EmptyFieldPipe, EmptyDatePipe, OnOffPipe, showHidePipe,
    EmptyDescriptionPipe
]