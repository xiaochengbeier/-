import { ModelDefined, Optional } from "sequelize";
import { Move } from "../entities/Moves";
interface NoteCreationAttributes extends Optional<Move, "validateThis" | "description" | "poster"> {
}
declare const MoveModel: ModelDefined<Move, NoteCreationAttributes>;
export { MoveModel };
