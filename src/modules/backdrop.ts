export const backdrop = function (addModal: boolean): boolean {
  if (addModal) {
    const bd = document.createElement("div");
    bd.id = "b-backdrop";
    bd.classList.add("b-backdrop");

    bd.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const bdSelector = document.getElementById("b-backdrop");
      if (bdSelector != null) bdSelector.remove();
      return false;
    });

    document.body.append(bd);
  } else {
    const bdSelector = document.getElementById("b-backdrop");
    if (bdSelector != null) bdSelector.remove();
    return false;
  }
  return true;
};
