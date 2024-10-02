package julien.maillard.model;

import lombok.Getter;
import lombok.Setter;
import julien.maillard.enumeration.ActivityArea;
import lombok.AllArgsConstructor;
import lombok.NonNull;

@Getter
@Setter
@AllArgsConstructor
public class Message {

    private static final String mailContent = "De : {{ from }}\nTéléphone : {{ phone }}\nSecteur d'activité : {{ activityArea }}\nMessage : {{ text }}";

    @NonNull
    private String from;

    private String phoneNumber;

    private ActivityArea activityArea;

    @NonNull
    private String text;

    public String display() {
        return mailContent.replace("{{ from }}", from).replace("{{ phone }}", phoneNumber)
                .replace("{{ activityArea }}", activityArea.toString()).replace("{{ text }}", text);
    }

}