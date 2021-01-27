require 'json'
# the value of `params` is the value of the hash passed to `script_params`
# in the logstash configuration
def register(params)
    @field_name = params["field_name"]
    @size_limit = params["size_limit"]
end

# the filter method receives an event and must return a list of events.
# Dropping an event means not including it in the return array,
# while creating new ones only requires you to add a new instance of
# LogStash::Event to the returned array

def filter(event)
    data = event.get(@field_name)
    if data
        # parse json
        #bag = JSON.parse(event.get(@field_name))
        bag = data
        new_bag = {}
        #new_bag["newfld"]="tests"
        bag.each do |key, value|
            if (! value.nil? && value.length > @size_limit)
                pos = @size_limit
                new_bag[key] = value[0..@size_limit-1]
                index = 1
                while pos <= value.length do
                        new_field = key + "_" + index.to_s
                        new_bag[new_field]=value[pos..pos+@size_limit - 1]
                        pos = pos + @size_limit
                        index = index + 1
                end
            #else
            #    new_bag[key] = value
            end
        end
        event.set("message",new_bag.to_json)
    end
    return [event]
end
