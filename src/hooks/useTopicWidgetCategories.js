import React from "react";

export default (widget = {}) => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const { subCategories } = widget;
    if (subCategories && subCategories.length) {
      setCategories([...[{ name: "All", active: true }], ...subCategories]);
    } else {
      setCategories([]);
    }
  }, [widget]);

  const setActiveCategory = category => {
    const updated = [...categories];
    const index = categories.indexOf(
      categories.find(({ name }) => category.name === name)
    );
    updated[index].active = !updated[index].active;
    setCategories(updated);
  };

  return {
    categories,
    setActiveCategory
  };
};
