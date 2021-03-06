import { openNotificationWithIcon } from "./notification";

export function errorLoadData() {
  openNotificationWithIcon(
    "error",
    "Erreur de chargement de données",
    "une erreur est survenue lors du chargement de données, Merci de réessayer plus tard"
  );
}
export function errorUpdateData(err) {
  if (err)
    openNotificationWithIcon(
      "error",
      "Erreur d'enregistrement de données",
      err
    );
  else
    openNotificationWithIcon(
      "error",
      "Erreur d'enregistrement de données",
      "une erreur est survenue lors de l'envoie de données, Merci de réessayer plus tard"
    );
}
export function successUpdateData(err) {
  if (err)
    openNotificationWithIcon(
      "error",
      "Erreur d'enregistrement de données",
      err
    );
  else
    openNotificationWithIcon("success", "Opération terminée avec succès!", "");
}
export function errorRemoveData() {
  openNotificationWithIcon(
    "error",
    "Erreur de suppression de données",
    "une erreur est survenue lors de suppression de données, Merci de réessayer plus tard"
  );
}

export function errorNotif(title, text) {
  openNotificationWithIcon("error", title, text);
}
