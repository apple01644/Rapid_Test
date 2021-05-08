import React from 'react';
import './App.css';
import ReactQuill, { Quill } from 'react-quill';
import { DeltaOperation, DeltaStatic, Delta, Sources } from 'quill';
import 'react-quill/dist/quill.snow.css';
import { toEditorSettings } from 'typescript';

function compare(A: object, B: object) {
  return JSON.stringify(A) === JSON.stringify(B);
}

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.handleQuillKeyDownEvent = this.handleQuillKeyDownEvent.bind(this);
    this.handleQuillChangeEvent = this.handleQuillChangeEvent.bind(this);
  }
  state: any = {
    keywords: ['int'],
    quill: {},
    quill_ref: React.createRef(),
  };

  defaultFormat = {
    background: 'white',
    color: 'black',
  };
  highlightFormat = {
    background: 'red',
    color: 'white',
  };

  handleQuillKeyDownEvent(e: any) {
    const editor: Quill = this.state.quill_ref.current.getEditor();

    if (
      e.keyCode === 8 ||
      e.keyCode === 9 ||
      e.keyCode === 13 ||
      e.keyCode === 16 ||
      e.keyCode === 17 ||
      e.keyCode === 18 ||
      e.keyCode === 20 ||
      e.keyCode === 27 ||
      e.keyCode === 33 ||
      e.keyCode === 34 ||
      e.keyCode === 35 ||
      e.keyCode === 36 ||
      e.keyCode === 37 ||
      e.keyCode === 38 ||
      e.keyCode === 49 ||
      e.keyCode === 40 ||
      e.keyCode === 46 ||
      e.keyCode === 229 ||
      e.ctrlKey
    )
      return;
    if (e.value === undefined) {
      const selection = editor.getSelection();
      if (selection!.length > 0) {
        editor.deleteText(selection!.index, selection!.length);
      }
      editor.insertText(selection!.index, e.key, {
        color: 'black',
        background: 'white',
      });
      e.preventDefault();
    }
  }

  handleQuillChangeEvent(content: string, delta: Delta, source: Sources) {
    if (source !== 'silent') {
      const editor: Quill = this.state.quill_ref.current.getEditor();
      let cursor = 0;

      editor.getContents().forEach((op: DeltaOperation) => {
        console.log(op);
        if (
          op?.attributes?.color === this.highlightFormat.color &&
          op?.attributes?.background === this.highlightFormat.background
        ) {
          if (op.insert !== 'int')
            editor.formatText(
              cursor,
              op.insert!.length,
              this.defaultFormat,
              'silent'
            );
        } else if (op!.insert!.endsWith('int')) {
          editor.formatText(
            cursor + op.insert!.length - 3,
            3,
            this.highlightFormat,
            'silent'
          );
        }
        cursor += op.insert!.length;
      });
    }
  }

  render() {
    return (
      <div className='App'>
        <h1 children='1243' />
        <ReactQuill
          theme='snow'
          ref={this.state.quill_ref}
          value={this.state.quill}
          modules={{
            toolbar: [{ background: '#FF0000' }],
          }}
          defaultValue='123154'
          onKeyDown={this.handleQuillKeyDownEvent}
          onChange={this.handleQuillChangeEvent}
        />
      </div>
    );
  }
}

export default App;
