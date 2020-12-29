open Jest
open Expect

let () =
  describe "optionalField" (fun () ->
      test "successfully decodes an existing field of the correct type"
        (fun () ->
          expect
          @@ Json_Decode_Strict.optionalField "prop" Json.Decode.int
               [%raw {| { prop: 3 } |}]
          |> toBe (Some 3));

      test "successfully decodes a non-existent field" (fun () ->
          expect
          @@ Json_Decode_Strict.optionalField "nonExistent" Json.Decode.int
               [%raw {| { prop: 3 } |}]
          |> toBe None);

      test "throws if the passed JSON is not an object" (fun () ->
          ( expect @@ fun () ->
            Json_Decode_Strict.optionalField "prop" Json.Decode.int
              [%raw {| "notanobject" |}] )
          |> toThrow);

      test "throws if the passed JSON is null" (fun () ->
          ( expect @@ fun () ->
            Json_Decode_Strict.optionalField "prop" Json.Decode.int
              [%raw {| null |}] )
          |> toThrow);

      test "throws if the existing field does not pass the decoder" (fun () ->
          ( expect @@ fun () ->
            Json_Decode_Strict.optionalField "prop" Json.Decode.int
              [%raw {| { prop: "notAnInteger" } |}] )
          |> toThrow))
