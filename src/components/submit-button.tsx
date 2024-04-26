export default function SubmitButton({
  pending,
  text = "Submit",
}: {
  pending: boolean
  text: string
}) {
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : text}
    </button>
  )
}
