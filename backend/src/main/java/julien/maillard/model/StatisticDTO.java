package julien.maillard.model;

import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StatisticDTO {

    private List<List<Integer>> developers;
    private List<List<Integer>> recruiters;
    private List<List<Integer>> students;
    private List<List<Integer>> clients;
    private List<List<Integer>> curious;
    private List<List<Integer>> others;

}