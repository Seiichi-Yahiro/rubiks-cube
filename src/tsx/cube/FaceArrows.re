[@bs.module] external arrowsScss: _ = "./Arrows.scss";

module Direction = {
  type t =
    | Up
    | Left
    | Right
    | Down;

  let values = [Up, Down, Left, Right];

  let toRotation =
    fun
    | Up => Math.Matrix4.fromAngleZ(Deg(180.0))
    | Left => Math.Matrix4.fromAngleZ(Deg(90.0))
    | Right => Math.Matrix4.fromAngleZ(Deg(-90.0))
    | Down => Math.Matrix4.fromAngleZ(Deg(0.0));
};

[@react.component]
let make = () => {
  <svg viewBox="0 0 100 100" className="face-arrows-svg">
    <g className="face-arrows-wrapper">
      {Direction.values
       ->Belt.List.map(direction => {
           let transform =
             direction->Direction.toRotation->Math.Matrix4.toCssMatrix;
           let style = ReactDOMRe.Style.make(~transform, ());

           <g key=transform style className="face-arrow-wrapper">
             <rect className="face-arrow-wrapper__box" />
             <g className="arrow face-arrow">
               <line x1="0" y1="40" x2="0" y2="-40" />
               <line x1="0" y1="-40" x2="-40" y2="0" />
               <line x1="0" y1="-40" x2="40" y2="0" />
             </g>
           </g>;
         })
       ->Belt.List.toArray
       ->React.array}
    </g>
  </svg>;
};