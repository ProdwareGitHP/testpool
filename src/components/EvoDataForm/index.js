import React from "react";

import { EvoVBox, EvoHBox } from "../EvoBox";
import EvoDataFormElement from "./element";
import EvoSection from "../EvoSection";

const ElementList = ({ items, gap, ...props }) => {
  const EvoBox = props.direction === "row" ? EvoHBox : EvoVBox;
  return (
    <EvoBox gap={gap}>
      {items.map((item) =>
        item?.isVisble != false ? (
          <EvoDataFormElement {...props} {...item} />
        ) : null
      )}
    </EvoBox>
  );
};

const SectionList = ({ sections, ...props }) => (
  <EvoVBox divider>
    {sections.map((section) => {
      return section?.sectionName ? (
        <EvoSection title={section?.sectionName}>
          <ElementList {...props} {...section} />
        </EvoSection>
      ) : (
        <ElementList {...props} {...section} />
      );
    })}
  </EvoVBox>
);

export const EvoDataForm = ({ formData = {} }) => {
  const { sections, items, item, ...props } = formData;
  if (sections) return <SectionList sections={sections} {...props} />;
  if (items) return <ElementList items={items} {...props} />;
  if (item) return <EvoDataFormElement {...props} {...item} />;
  return null;
};
