import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Layer {
        _id: string;
        artist:string;
        childlayers:string[];
        description:string;
        name:string;
        parentlayer:string;
}

const initialState:{value:Layer;} = {
	value:{
		_id:"0",
		artist:"None",
		childlayers:[],
		description:"None",
		name:"None",
		parentlayer:""
	}
};

export const name = 'songSelector';

const slice = createSlice({
  name,
  initialState,
  // The `reducers` field allows us define reducers and generate associated actions
  reducers: {
    // The `PayloadAction` type allows us to declare the contents of `action.payload`
    selectSong: (state, action: PayloadAction<Layer>) => {
      state.value = action.payload;
    },
  },
});

export const { actions, reducer } = slice;
