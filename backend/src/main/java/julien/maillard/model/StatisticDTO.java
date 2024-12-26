package julien.maillard.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StatisticDTO {
    
    private int numberDeveloper;
    private int numberRecruiter;
    private int numberStudent;
    private int numberClient;
    private int numberCurious;
    private int numberOther;
    // Map avec en clé le mois un nom de mois et en valeur un tableau contenant nombre de visiteurs sur ordinateur en première position et sur mobile en seconde
    private Map<Integer, int[]> deviceStatistics;

}