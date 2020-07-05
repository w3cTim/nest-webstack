import { prop, modelOptions } from '@typegoose/typegoose';


@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})

export class WebStack {
  @prop()
  name: string;

  @prop()
  userID: number;

  @prop()
  icofont: string;
}
