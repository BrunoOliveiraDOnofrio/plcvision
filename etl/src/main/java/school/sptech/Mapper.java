package school.sptech;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import school.sptech.Stock;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class Mapper {
    public List<Stock> map(InputStream inputStream) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(inputStream, new TypeReference<List<Stock>>() {
        });
    }
}